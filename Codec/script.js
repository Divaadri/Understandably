const splash = document.getElementById("splash");
const homeBtn = document.getElementById("homeBtn");
const homeScreen = document.getElementById("homeScreen");
const resultScreen = document.getElementById("resultScreen");
const loading = document.getElementById("loading");

const classSelect = document.getElementById("classSelect");
const analyzeBtn = document.getElementById("analyzeBtn");
const classImage = document.getElementById("classImage");
const planShell = document.querySelector(".planShell");

const overallScore = document.getElementById("overallScore");
const recommendations = document.getElementById("recommendations");
const overlay = document.getElementById("overlay");

const recommendationTab = document.getElementById("recommendationTab");
const bestsTab = document.getElementById("bestsTab");
const seatTab = document.getElementById("seatTab");
const recommendationPanel = document.getElementById("recommendationPanel");
const bestsPanel = document.getElementById("bestsPanel");
const seatPanel = document.getElementById("seatPanel");
const bestsInfo = document.getElementById("bestsInfo");
const seatInfo = document.getElementById("seatInfo");
const currentDate = document.getElementById("currentDate");

const classrooms = {
    class8a: "assets/class8a.jpg",
    class8b: "assets/class8b.jpg",
    class8c: "assets/class8c.jpg",
    class8d: "assets/class8d.jpg"
};

const seatMaps = {
    class8a: [
        { id: "T1", x: 0.08, y: 0.38 },
        { id: "T2", x: 0.08, y: 0.47 },
        { id: "T3", x: 0.08, y: 0.58 },
        { id: "T4", x: 0.08, y: 0.68 },
        { id: "T5", x: 0.14, y: 0.84 },
        { id: "T6", x: 0.25, y: 0.84 },
        { id: "T7", x: 0.36, y: 0.84 },
        { id: "T8", x: 0.47, y: 0.84 },
        { id: "T9", x: 0.58, y: 0.84 },
        { id: "T10", x: 0.70, y: 0.84 },
        { id: "T11", x: 0.81, y: 0.84 },
        { id: "T12", x: 0.93, y: 0.25 },
        { id: "T13", x: 0.93, y: 0.35 },
        { id: "T14", x: 0.93, y: 0.46 },
        { id: "T15", x: 0.93, y: 0.57 },
        { id: "T16", x: 0.93, y: 0.68 }
    ],
    class8b: [
        { id: "T1", x: 0.18, y: 0.31 },
        { id: "T2", x: 0.28, y: 0.32 },
        { id: "T3", x: 0.38, y: 0.32 },
        { id: "T4", x: 0.18, y: 0.52 },
        { id: "T5", x: 0.28, y: 0.52 },
        { id: "T6", x: 0.39, y: 0.52 },
        { id: "T7", x: 0.60, y: 0.34 },
        { id: "T8", x: 0.70, y: 0.36 },
        { id: "T9", x: 0.80, y: 0.39 },
        { id: "T10", x: 0.57, y: 0.53 },
        { id: "T11", x: 0.68, y: 0.56 },
        { id: "T12", x: 0.78, y: 0.58 },
        { id: "T13", x: 0.17, y: 0.66 },
        { id: "T14", x: 0.28, y: 0.67 },
        { id: "T15", x: 0.39, y: 0.68 },
        { id: "T16", x: 0.17, y: 0.88 },
        { id: "T17", x: 0.28, y: 0.88 },
        { id: "T18", x: 0.39, y: 0.88 },
        { id: "T19", x: 0.60, y: 0.70 },
        { id: "T20", x: 0.70, y: 0.68 },
        { id: "T21", x: 0.80, y: 0.66 },
        { id: "T22", x: 0.60, y: 0.87 },
        { id: "T23", x: 0.70, y: 0.85 },
        { id: "T24", x: 0.80, y: 0.83 }
    ],
    class8c: [
        { id: "T1", x: 0.08, y: 0.20 },
        { id: "T2", x: 0.08, y: 0.31 },
        { id: "T3", x: 0.08, y: 0.43 },
        { id: "T4", x: 0.08, y: 0.54 },
        { id: "T5", x: 0.08, y: 0.65 },
        { id: "T6", x: 0.08, y: 0.77 },
        { id: "T7", x: 0.08, y: 0.88 },
        { id: "T8", x: 0.32, y: 0.35 },
        { id: "T9", x: 0.32, y: 0.46 },
        { id: "T10", x: 0.32, y: 0.57 },
        { id: "T11", x: 0.32, y: 0.65 },
        { id: "T12", x: 0.55, y: 0.70 },
        { id: "T13", x: 0.62, y: 0.70 },
        { id: "T14", x: 0.70, y: 0.45 },
        { id: "T15", x: 0.70, y: 0.56 },
        { id: "T16", x: 0.89, y: 0.21 },
        { id: "T17", x: 0.89, y: 0.32 },
        { id: "T18", x: 0.89, y: 0.43 },
        { id: "T19", x: 0.89, y: 0.54 },
        { id: "T20", x: 0.89, y: 0.65 },
        { id: "T21", x: 0.89, y: 0.76 },
        { id: "T22", x: 0.89, y: 0.88 },
        { id: "T23", x: 0.29, y: 0.92 },
        { id: "T24", x: 0.40, y: 0.92 },
        { id: "T25", x: 0.66, y: 0.92 },
        { id: "T26", x: 0.78, y: 0.92 }
    ],
    class8d: [
        { id: "T1", x: 0.09, y: 0.39 },
        { id: "T2", x: 0.20, y: 0.39 },
        { id: "T3", x: 0.31, y: 0.39 },
        { id: "T4", x: 0.42, y: 0.39 },
        { id: "T5", x: 0.62, y: 0.39 },
        { id: "T6", x: 0.73, y: 0.39 },
        { id: "T7", x: 0.84, y: 0.39 },
        { id: "T8", x: 0.95, y: 0.39 },
        { id: "T9", x: 0.08, y: 0.60 },
        { id: "T10", x: 0.20, y: 0.60 },
        { id: "T11", x: 0.32, y: 0.60 },
        { id: "T12", x: 0.43, y: 0.60 },
        { id: "T13", x: 0.62, y: 0.59 },
        { id: "T14", x: 0.73, y: 0.59 },
        { id: "T15", x: 0.85, y: 0.59 },
        { id: "T16", x: 0.95, y: 0.59 },
        { id: "T17", x: 0.09, y: 0.87 },
        { id: "T18", x: 0.20, y: 0.87 },
        { id: "T19", x: 0.32, y: 0.87 },
        { id: "T20", x: 0.43, y: 0.87 },
        { id: "T21", x: 0.62, y: 0.86 },
        { id: "T22", x: 0.73, y: 0.86 },
        { id: "T23", x: 0.85, y: 0.86 },
        { id: "T24", x: 0.95, y: 0.86 }
    ]
};

let activeClassroom = "";

window.addEventListener("load", () => {
    updateDate();
    setInterval(updateDate, 1000);

    setTimeout(() => {
        splash.classList.add("hide");
    }, 1300);

    setTimeout(() => {
        splash.remove();
    }, 1900);
});

function updateDate() {
    const now = new Date();

    currentDate.textContent = now.toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });
}

homeBtn.addEventListener("click", showHome);

analyzeBtn.addEventListener("click", async () => {
    const classroom = classSelect.value;

    if (!classroom) {
        alert("Please select a classroom.");
        return;
    }

    loading.hidden = false;
    homeScreen.hidden = true;
    resultScreen.hidden = true;
    clearSeatSelection();

    activeClassroom = classroom;
    classImage.src = classrooms[classroom];

    try {
        const data = await analyzeClassroom(
            classrooms[classroom],
            classroom,
            seatMaps[classroom] || []
        );
        window.latestData = data;

        displayResults(data);
        loading.hidden = true;
        resultScreen.hidden = false;
        resultScreen.classList.remove("fadeIn");
        void resultScreen.offsetWidth;
        resultScreen.classList.add("fadeIn");
    } catch (err) {
        console.error(err);
        loading.hidden = true;
        homeScreen.hidden = false;
        alert("AI Analysis Failed.");
    }
});

function showHome() {
    homeScreen.hidden = false;
    resultScreen.hidden = true;
    loading.hidden = true;
    clearSeatSelection();
}

function displayResults(data) {
    if (!activeClassroom) {
        activeClassroom = classSelect.value || inferClassroomFromImage();
    }

    const mappedSeats = mapSeatsToClassroom(
        Array.isArray(data.seats) ? data.seats : [],
        activeClassroom
    );

    window.latestData = {
        ...data,
        seats: mappedSeats
    };

    syncClassImageFrame();
    overallScore.textContent = data.classroomScore ?? "--";
    setScoreTone(overallScore, data.classroomScore);
    recommendationTab.click();

    recommendations.innerHTML = "";

    if (Array.isArray(data.recommendations) && data.recommendations.length) {
        data.recommendations.slice(0, 3).forEach((rec) => {
            const item = document.createElement("p");
            item.textContent = rec;
            recommendations.appendChild(item);
        });
    } else {
        const item = document.createElement("p");
        item.textContent = "No recommendations.";
        recommendations.appendChild(item);
    }

    renderBests(mappedSeats);
    drawSeats(mappedSeats);
}

function inferClassroomFromImage() {
    const imageSource = classImage.getAttribute("src") || "";
    const match = imageSource.match(/class8[a-d]/i);

    return match ? match[0].toLowerCase() : "";
}

function mapSeatsToClassroom(aiSeats, classroom) {
    const map = seatMaps[classroom];

    if (!Array.isArray(map) || !map.length) {
        return aiSeats;
    }

    const seatsById = new Map(
        aiSeats
            .filter((seat) => seat && seat.id)
            .map((seat) => [String(seat.id).trim().toLowerCase(), seat])
    );

    return map.map((mappedSeat, index) => {
        const aiSeat = seatsById.get(mappedSeat.id.toLowerCase()) || aiSeats[index] || {};

        return {
            ...aiSeat,
            id: mappedSeat.id,
            x: mappedSeat.x,
            y: mappedSeat.y,
            score: aiSeat.score ?? 60,
            visibility: aiSeat.visibility || "Pending",
            lighting: aiSeat.lighting || "Pending",
            distance: aiSeat.distance || "Pending",
            comfort: aiSeat.comfort || "Pending",
            reason: aiSeat.reason || "Mapped from the classroom layout. AI score details were not returned for this seat."
        };
    });
}

function syncClassImageFrame() {
    if (!classImage.naturalWidth || !classImage.naturalHeight) {
        return;
    }

    planShell.style.setProperty(
        "--classroom-ratio",
        `${classImage.naturalWidth} / ${classImage.naturalHeight}`
    );
}

function drawSeats(seats) {
    overlay.innerHTML = "";

    seats.forEach((seat, index) => {
        const marker = document.createElement("button");
        marker.type = "button";
        marker.className = `seat ${scoreClass(seat.score)}`;
        marker.setAttribute("aria-label", `${seat.id || `T${index + 1}`} - ${seat.score ?? "--"}`);
        marker.title = `${seat.id || `T${index + 1}`} - ${seat.score ?? "--"}`;
        marker.dataset.id = seat.id || `T${index + 1}`;

        const x = normalizeCoordinate(seat.x, fallbackSeatPosition(index).x);
        const y = normalizeCoordinate(seat.y, fallbackSeatPosition(index).y);

        marker.style.left = `${x * 100}%`;
        marker.style.top = `${y * 100}%`;

        marker.addEventListener("click", () => showSeat(seat, marker.dataset.id));
        overlay.appendChild(marker);
    });
}

function scoreClass(score) {
    const numericScore = Number(score);

    if (numericScore > 70) {
        return "best";
    }

    if (numericScore < 50) {
        return "bad";
    }

    return "medium";
}

function setScoreTone(element, score) {
    element.classList.remove("best", "medium", "bad");
    element.classList.add(scoreClass(score));
}

function normalizeCoordinate(value, fallback) {
    const numericValue = Number(value);

    if (!Number.isFinite(numericValue)) {
        return fallback;
    }

    if (numericValue > 1 && numericValue <= 100) {
        return Math.min(0.95, Math.max(0.05, numericValue / 100));
    }

    return Math.min(0.95, Math.max(0.05, numericValue));
}

function fallbackSeatPosition(index) {
    const positions = [
        { x: 0.27, y: 0.37 },
        { x: 0.27, y: 0.56 },
        { x: 0.27, y: 0.75 },
        { x: 0.80, y: 0.31 },
        { x: 0.80, y: 0.50 },
        { x: 0.80, y: 0.69 },
        { x: 0.36, y: 0.86 },
        { x: 0.45, y: 0.86 },
        { x: 0.54, y: 0.86 },
        { x: 0.63, y: 0.86 },
        { x: 0.72, y: 0.86 },
        { x: 0.81, y: 0.86 }
    ];

    return positions[index % positions.length];
}

recommendationTab.addEventListener("click", () => activateTab("recommendation"));
bestsTab.addEventListener("click", () => activateTab("bests"));
seatTab.addEventListener("click", () => activateTab("seat"));

function activateTab(activeTab) {
    const tabs = {
        recommendation: {
            button: recommendationTab,
            panel: recommendationPanel
        },
        bests: {
            button: bestsTab,
            panel: bestsPanel
        },
        seat: {
            button: seatTab,
            panel: seatPanel
        }
    };

    Object.entries(tabs).forEach(([key, tab]) => {
        tab.button.classList.toggle("active", key === activeTab);
        tab.panel.classList.toggle("hidden", key !== activeTab);
    });

    if (activeTab !== "seat") {
        clearSeatSelection(false);
    }
}

function showSeat(seat, fallbackId) {
    seatTab.click();

    document.querySelectorAll(".seat").forEach((marker) => {
        marker.classList.toggle("selected", marker.dataset.id === fallbackId);
    });

    const seatId = escapeHtml(seat.id || fallbackId || "Seat");
    const score = escapeHtml(seat.score ?? "--");
    const scoreTone = scoreClass(seat.score);

    seatInfo.innerHTML = `
        <h2>${seatId}</h2>
        <span class="seatScore ${scoreTone}">${score}</span>
        <hr>
        <div class="metric">
            <strong>Visibility</strong>
            <span>${escapeHtml(seat.visibility || "Good")}</span>
        </div>
        <div class="metric">
            <strong>Lighting</strong>
            <span>${escapeHtml(seat.lighting || "Good")}</span>
        </div>
        <div class="metric">
            <strong>Distance</strong>
            <span>${escapeHtml(seat.distance || "Normal")}</span>
        </div>
        <div class="metric">
            <strong>Comfort</strong>
            <span>${escapeHtml(seat.comfort || "Good")}</span>
        </div>
        <div class="seatReason">
            <strong>Reason</strong>
            <p>${escapeHtml(seat.reason || "No reason provided.")}</p>
        </div>
    `;
}

function renderBests(seats) {
    if (!seats.length) {
        bestsInfo.textContent = "No seats detected.";
        return;
    }

    const categories = [
        {
            label: "Overall",
            scoreKey: "score",
            textKey: "reason"
        },
        {
            label: "Visibility",
            scoreKey: "visibilityScore",
            textKey: "visibility"
        },
        {
            label: "Lighting",
            scoreKey: "lightingScore",
            textKey: "lighting"
        },
        {
            label: "Distance",
            scoreKey: "distanceScore",
            textKey: "distance"
        },
        {
            label: "Comfort",
            scoreKey: "comfortScore",
            textKey: "comfort"
        }
    ];

    bestsInfo.innerHTML = categories.map((category) => {
        const result = findBestSeat(seats, category);
        const seat = result.seat;
        const displayScore = Number.isFinite(result.score)
            ? Math.round(result.score)
            : "--";
        const tone = Number.isFinite(result.score) ? scoreClass(result.score) : "medium";
        const detail = category.label === "Overall"
            ? seat.reason || "Highest total classroom suitability score."
            : `${category.label}: ${seat[category.textKey] || "Best available rating."}`;

        return `
            <article class="bestItem">
                <div class="bestItemTop">
                    <span>Best ${escapeHtml(category.label)}</span>
                    <strong>${escapeHtml(seat.id || "Seat")}</strong>
                    <em class="bestScore ${tone}">${escapeHtml(displayScore)}</em>
                </div>
                <p>${escapeHtml(detail)}</p>
            </article>
        `;
    }).join("");
}

function findBestSeat(seats, category) {
    return seats.reduce((best, seat) => {
        const score = categoryScore(seat, category);

        if (!best || score > best.score) {
            return {
                seat,
                score
            };
        }

        if (score === best.score && Number(seat.score) > Number(best.seat.score)) {
            return {
                seat,
                score
            };
        }

        return best;
    }, null);
}

function categoryScore(seat, category) {
    const numericScore = Number(seat[category.scoreKey]);

    if (Number.isFinite(numericScore)) {
        return numericScore;
    }

    if (category.scoreKey === "score") {
        const overall = Number(seat.score);
        return Number.isFinite(overall) ? overall : 0;
    }

    return qualitativeScore(seat[category.textKey]);
}

function qualitativeScore(value) {
    const text = String(value || "").toLowerCase();

    if (text.includes("excellent")) {
        return 95;
    }

    if (text.includes("very good") || text.includes("near")) {
        return 88;
    }

    if (text.includes("good") || text.includes("normal")) {
        return 76;
    }

    if (text.includes("average") || text.includes("fair")) {
        return 60;
    }

    if (text.includes("weak") || text.includes("low") || text.includes("far") || text.includes("poor")) {
        return 35;
    }

    return 0;
}

function clearSeatSelection(resetText = true) {
    document.querySelectorAll(".seat").forEach((marker) => {
        marker.classList.remove("selected");
    });

    if (resetText) {
        seatInfo.textContent = "Click a seat to view analytics.";
    }
}

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

window.addEventListener("resize", () => {
    if (window.latestData) {
        drawSeats(Array.isArray(window.latestData.seats) ? window.latestData.seats : []);
    }
});

classImage.addEventListener("load", () => {
    syncClassImageFrame();

    if (window.latestData) {
        drawSeats(Array.isArray(window.latestData.seats) ? window.latestData.seats : []);
    }
});

clearSeatSelection();
