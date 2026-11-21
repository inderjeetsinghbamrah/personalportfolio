import { NextRequest, NextResponse } from "next/server";

interface OBEStudentScore {
  studentId: string;
  co1_score: number; // max 20
  co2_score: number; // max 20
  co3_score: number; // max 20
  co4_score: number; // max 20
}

interface OBECalculationInput {
  courseCode: string;
  thresholdPercentage: number; // e.g. 60%
  directWeightage: number;     // e.g. 0.8 (80%)
  indirectWeightage: number;   // e.g. 0.2 (20%)
  students: OBEStudentScore[];
}

export async function POST(req: NextRequest) {
  try {
    const body: OBECalculationInput = await req.json();
    const {
      courseCode = "CS401",
      thresholdPercentage = 60,
      directWeightage = 0.8,
      indirectWeightage = 0.2,
      students = [
        { studentId: "STU-001", co1_score: 16, co2_score: 15, co3_score: 18, co4_score: 14 },
        { studentId: "STU-002", co1_score: 12, co2_score: 14, co3_score: 11, co4_score: 16 },
        { studentId: "STU-003", co1_score: 18, co2_score: 19, co3_score: 17, co4_score: 18 },
        { studentId: "STU-004", co1_score: 9, co2_score: 11, co3_score: 13, co4_score: 10 },
        { studentId: "STU-005", co1_score: 15, co2_score: 17, co3_score: 14, co4_score: 15 },
        { studentId: "STU-006", co1_score: 14, co2_score: 12, co3_score: 16, co4_score: 13 },
      ],
    } = body;

    const maxMarks = 20;
    const passingThreshold = (thresholdPercentage / 100) * maxMarks;
    const totalStudents = students.length;

    const outcomes = ["CO1", "CO2", "CO3", "CO4"] as const;
    const coResults = outcomes.map((coKey, idx) => {
      const propKey = `co${idx + 1}_score` as keyof OBEStudentScore;
      const countMeetingThreshold = students.filter(
        (s) => Number(s[propKey]) >= passingThreshold
      ).length;
      const percentageMeeting = (countMeetingThreshold / totalStudents) * 100;

      // NBA/NAAC Rubric Level:
      // Level 3: >= 70% of students scoring >= threshold
      // Level 2: >= 60% of students scoring >= threshold
      // Level 1: >= 50% of students scoring >= threshold
      // Level 0: < 50%
      let attainmentLevel = 0;
      if (percentageMeeting >= 70) attainmentLevel = 3;
      else if (percentageMeeting >= 60) attainmentLevel = 2;
      else if (percentageMeeting >= 50) attainmentLevel = 1;

      // Direct Attainment
      const directAttainment = attainmentLevel;
      // Mock Course Exit Survey (Indirect Attainment rating out of 3)
      const indirectAttainment = 2.75;
      const finalAttainment = Number(
        (directAttainment * directWeightage + indirectAttainment * indirectWeightage).toFixed(2)
      );

      return {
        co: coKey,
        targetThresholdMarks: passingThreshold,
        studentsCount: totalStudents,
        studentsAboveThreshold: countMeetingThreshold,
        percentageAttained: Number(percentageMeeting.toFixed(1)),
        attainmentLevel,
        directAttainment,
        indirectAttainment,
        finalAttainment,
      };
    });

    // Program Outcome (PO) Mapping sample (PO1: Engineering Knowledge, PO2: Problem Analysis, PO3: Design/Dev)
    const poMapping = [
      { po: "PO1 (Engineering Knowledge)", weight: 3, attained: Number((coResults[0].finalAttainment * 0.95).toFixed(2)) },
      { po: "PO2 (Problem Analysis)", weight: 3, attained: Number((coResults[1].finalAttainment * 0.92).toFixed(2)) },
      { po: "PO3 (Design & Solutions)", weight: 2, attained: Number((coResults[2].finalAttainment * 0.88).toFixed(2)) },
      { po: "PO4 (Modern Tool Usage)", weight: 2, attained: Number((coResults[3].finalAttainment * 0.96).toFixed(2)) },
    ];

    return NextResponse.json({
      status: "success",
      meta: {
        courseCode,
        thresholdPercentage,
        directWeightage,
        indirectWeightage,
        calculatedAt: new Date().toISOString(),
        engine: "EDUOBAL NBA/NAAC Accredited OBE Kernel v2.4",
      },
      coResults,
      poMapping,
    });
  } catch (err) {
    console.error("OBE calculation error:", err);
    return NextResponse.json({ error: "Failed to compute OBE matrix." }, { status: 500 });
  }
}
