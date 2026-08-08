exports.handler = async (event) => {
    try {
        if (event.httpMethod !== "POST") {
            return {
                statusCode: 405,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    error: "Method not allowed"
                })
            };
        }

        const { prompt, base64, mimeType = "image/jpeg" } = JSON.parse(event.body || "{}");

        if (!prompt || !base64) {
            return {
                statusCode: 400,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    error: "Missing prompt or image data"
                })
            };
        }

        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            return {
                statusCode: 500,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    error: "GEMINI_API_KEY is not configured on the server."
                })
            };
        }

        const model = "models/gemini-3.1-flash-lite";

        const body = {
            contents: [
                {
                    parts: [
                        {
                            text: prompt
                        },
                        {
                            inline_data: {
                                mime_type: mimeType,
                                data: base64
                            }
                        }
                    ]
                }
            ]
        };

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/${model}:generateContent?key=${apiKey}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            }
        );

        const result = await response.json();

        console.log("Gemini status:", response.status);

        if (!response.ok) {
            console.error("Gemini error:", result);

            return {
                statusCode: response.status,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    error: result.error?.message || "Gemini API Error"
                })
            };
        }

        if (
            !result.candidates ||
            result.candidates.length === 0 ||
            !result.candidates[0].content ||
            !result.candidates[0].content.parts
        ) {
            return {
                statusCode: 502,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    error: "No response from Gemini."
                })
            };
        }

        let text = result.candidates[0].content.parts[0].text;

        text = text
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        let parsed;

        try {
            parsed = JSON.parse(text);
        } catch (error) {
            console.error("Invalid Gemini JSON:", text);

            return {
                statusCode: 502,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    error: "Gemini returned invalid JSON."
                })
            };
        }

        return {
            statusCode: 200,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(parsed)
        };

    } catch (error) {
        console.error("Backend error:", error);

        return {
            statusCode: 500,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                error: error.message || "Internal server error"
            })
        };
    }
};