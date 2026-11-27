// CALLS and FIT weren't defined in your snippet: edit these two shared lines to your real copy.
const CALLS = "Input call + induction call + 3 review calls with nutrition experts (1st month)";
const FIT = "Induction call + post-plan call + 2 review calls with fitness experts (1st month)";
import prenatal from "../assets/prenatal.webp";
import postnatal from "../assets/postnatal.webp";
import pro from "../assets/pro.webp";
import tone from "../assets/tone.webp";
import elite from "../assets/elite.webp";

export const defaultPlans = [
  { icon: "Heart", name: "Prenatal Care", img: prenatal, group: "Weight management", tag: "Blossom", bg: "#ff9d1a", for: "Expecting mothers", stat: ["36+", "live group prenatal workout sessions"],
    features: [CALLS, FIT, "Customised diet plan with periodic revisions", "36+ live group prenatal workout sessions", "Diet & fitness review calls, twice monthly", "Meal plate review and progress follow-up on WhatsApp", "Access to recipe vault"] },
  { icon: "Activity", name: "Postnatal Care", img: postnatal, group: "Weight management", tag: "Queen", bg: "#f2d64b", for: "New mothers, incl. diastasis recti", stat: ["41+", "live group postnatal & DR workout sessions"],
    features: [CALLS, FIT, "Customised diet plan with periodic revisions", "41+ live group postnatal & DR workout sessions", "Diet & fitness review calls, twice monthly", "Meal plate review and progress follow-up on WhatsApp", "Monthly revisions to diet plan", "Access to recipe vault"] },
  { icon: "User", name: "No Health Conditions", img: pro, group: "Weight management", tag: "Pro", bg: "#fde98a", for: "Healthy adults", stat: ["23+", "live group workout sessions"],
    features: [CALLS, "Customised diet plan with periodic revisions", "23+ live group workout sessions", "Diet review calls, twice monthly", "Daily meal plate review and progress follow-up on WhatsApp", "Access to recipe vault"] },
  { icon: "Stethoscope", name: "With Health Conditions", img: elite, group: "Weight management", tag: "Elite", bg: "#d9c7b0", for: "Managing a medical condition", stat: ["41+", "live group workout sessions"],
    features: [CALLS, FIT, "Customised diet & workout plan with periodic revisions", "41+ live group workout sessions", "Diet & fitness review calls, twice monthly", "Daily meal plate review and progress follow-up on WhatsApp", "Access to recipe vault"] },
  { icon: "Dumbbell", name: "Fitness-Based Body Toning Program", img: tone, group: "Body toning", tag: "Tone", bg: "#14110d", dark: true, for: "Building strength & shape", stat: ["1:1", "video consultations with your coach"],
    features: ["Smart nutrition guidance", "Exclusive 1:1 video consultations", "Expert-guided fitness training", "Progress monitoring"] },
];