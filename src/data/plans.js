const CALLS = "Free onboarding call with your coach";
const FIT = "Personalised fitness assessment";

export const defaultPlans = [
  { icon: "Heart", name: "Prenatal Care", group: "Weight management", tag: "Blossom", bg: "#f7b3e8", for: "Expecting mothers", stat: ["36+", "live group prenatal workout sessions"],
    features: [CALLS, FIT, "Customised diet plan with periodic revisions", "36+ live group prenatal workout sessions", "Diet & fitness review calls, twice monthly", "Meal plate review and progress follow-up on WhatsApp", "Access to recipe vault"] },
  { icon: "Activity", name: "Postnatal Care", group: "Weight management", tag: "Queen", bg: "#ffcf8a", for: "New mothers, incl. diastasis recti", stat: ["41+", "live group postnatal & DR workout sessions"],
    features: [CALLS, FIT, "Customised diet plan with periodic revisions", "41+ live group postnatal & DR workout sessions", "Diet & fitness review calls, twice monthly", "Meal plate review and progress follow-up on WhatsApp", "Monthly revisions to diet plan", "Access to recipe vault"] },
  { icon: "User", name: "No Health Conditions", group: "Weight management", tag: "Pro", bg: "#8fcdf1", for: "Healthy adults", stat: ["23+", "live group workout sessions"],
    features: [CALLS, "Customised diet plan with periodic revisions", "23+ live group workout sessions", "Diet review calls, twice monthly", "Daily meal plate review and progress follow-up on WhatsApp", "Access to recipe vault"] },
  { icon: "Stethoscope", name: "With Health Conditions", group: "Weight management", tag: "Elite", bg: "#8fe3ac", for: "Managing a medical condition", stat: ["41+", "live group workout sessions"],
    features: [CALLS, FIT, "Customised diet & workout plan with periodic revisions", "41+ live group workout sessions", "Diet & fitness review calls, twice monthly", "Daily meal plate review and progress follow-up on WhatsApp", "Access to recipe vault"] },
  { icon: "Dumbbell", name: "Fitness-Based Body Toning Program", group: "Body toning", tag: "Tone", bg: "#f6e23e", btn: "#fff", for: "Building strength & shape", stat: ["1:1", "video consultations with your coach"],
    features: ["Smart nutrition guidance", "Exclusive 1:1 video consultations", "Expert-guided fitness training", "Progress monitoring"] },
];
