async function imageToBase64(imagePath) {
    const response = await fetch(imagePath);

    if (!response.ok) {
        throw new Error("Failed to load classroom image.");
    }

    const blob = await response.blob();

    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
            resolve(reader.result.split(",")[1]);
        };

        reader.onerror = reject;

        reader.readAsDataURL(blob);
    });
}


async function analyzeClassroom(
    imagePath,
    classroomId = "",
    expectedSeats = []
) {

    try {

        // Convert classroom image to Base64
        const base64 = await imageToBase64(imagePath);


        // Known classroom layout information
        const seatHint = expectedSeats.length
            ? `
KNOWN LAYOUT FOR THIS SELECTED CLASSROOM

Classroom id: ${classroomId}

Expected visible student seats: ${expectedSeats.length}

Return exactly these seat ids, in this order, one object per id:

${expectedSeats
    .map(
        (seat) =>
            `- ${seat.id}: x=${seat.x}, y=${seat.y}`
    )
    .join("\n")}

Use these coordinates exactly for each returned seat.
Analyze the image to score and explain each seat,
but do not change the ids or coordinates.
`
            : "";


        // AI analysis prompt
        const prompt = `
You are Understandably AI.

Analyze the classroom image carefully.
${seatHint}

IMPORTANT RULES

1. Detect EVERY visible student seat/chair/bench position in the classroom layout.

2. Double-check seat detection before answering:

- First scan the full image from top-left to bottom-right.
- Then scan the classroom perimeter clockwise and verify no visible seat was missed.
- If a seat label is visible, copy it EXACTLY as written.
- If no label is visible, assign ids in reading order as T1, T2, T3, etc.
- Never skip, merge, rename, or invent seats that are not visible.
- If a known layout is provided above, return exactly that known layout seat count and exactly those ids.

3. Return seat coordinates as normalized image percentages.

x = 0.0 to 1.0

y = 0.0 to 1.0

4. For EVERY visible seat return:

- id
- x
- y
- score (0-100)
- visibility
- visibilityScore (0-100)
- lighting
- lightingScore (0-100)
- distance
- distanceScore (0-100)
- comfort
- comfortScore (0-100)
- reason

5. Give an overall classroom score.

6. Give exactly THREE recommendations.

7. Return a seatDetectionAudit object with:

- visibleSeatCount
- detectedSeatIds
- doubleCheckPassed
- auditNote

8. Return ONLY valid JSON.

9. Do NOT wrap JSON inside markdown.

Example:

{
  "classroomScore": 92,

  "recommendations": [
    "Improve lighting near the back benches.",
    "Reduce glare from the left windows.",
    "Front benches are best for board visibility."
  ],

  "seatDetectionAudit": {
    "visibleSeatCount": 2,
    "detectedSeatIds": ["T1", "T2"],
    "doubleCheckPassed": true,
    "auditNote": "All visible seats were checked in two passes."
  },

  "seats": [
    {
      "id": "T1",
      "x": 0.18,
      "y": 0.34,
      "score": 95,
      "visibility": "Excellent",
      "visibilityScore": 96,
      "lighting": "Good",
      "lightingScore": 88,
      "distance": "Near",
      "distanceScore": 94,
      "comfort": "Excellent",
      "comfortScore": 95,
      "reason": "Clear view of the smart board."
    },

    {
      "id": "T2",
      "x": 0.26,
      "y": 0.34,
      "score": 88,
      "visibility": "Very Good",
      "visibilityScore": 90,
      "lighting": "Good",
      "lightingScore": 86,
      "distance": "Near",
      "distanceScore": 91,
      "comfort": "Good",
      "comfortScore": 84,
      "reason": "Slight side angle."
    }
  ]
}
`;


        // Send image + prompt to our Netlify backend
        const response = await fetch(
            "/.netlify/functions/analyze",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    prompt: prompt,
                    base64: base64,
                    mimeType: "image/jpeg"
                })
            }
        );


        // Read backend response
        const result = await response.json();

        console.log("Backend response:", result);


        // Handle backend/API errors
        if (!response.ok) {

            console.error("Backend error:", result);

            throw new Error(
                result.error ||
                "AI Analysis Error"
            );
        }


        // Backend already parsed Gemini's JSON
        return result;


    } catch (error) {

        console.error(
            "Classroom analysis failed:",
            error
        );

        throw error;
    }
}