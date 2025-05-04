const HealthProfile = require("../models/healthProfile.model");
const User = require("../models/user.model");

// Create Health Profile
exports.createHealthProfile = async (req, res) => {
  try {
    const {
      userId,
      age,
      gender,
      weight,
      height,
      activityLevel,
      dietaryPreferences,
      allergies,
      healthGoals,
      medicalConditions,
      preferredMealTypes,
      sleepHours,
      waterIntake,
    } = req.body;

    const existing = await HealthProfile.findOne({ where: { userId } });
    if (existing) {
      return res
        .status(400)
        .json({ message: "Health profile already exists for this user." });
    }

    const profile = await HealthProfile.create({
      userId,
      age,
      gender,
      weight,
      height,
      activityLevel,
      dietaryPreferences,
      allergies,
      healthGoals,
      medicalConditions,
      preferredMealTypes,
      sleepHours,
      waterIntake,
    });

    return res.status(201).json(profile);
  } catch (error) {
    console.error("Create HealthProfile Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Get All Health Profiles
exports.getAllHealthProfiles = async (req, res) => {
  try {
    const profiles = await HealthProfile.findAll({ include: User });
    return res.status(200).json(profiles);
  } catch (error) {
    console.error("Get All HealthProfiles Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Get Health Profile by User ID
exports.getHealthProfileByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const profile = await HealthProfile.findOne({
      where: { userId },
      include: User,
    });

    if (!profile) {
      return res.status(404).json({ message: "Health profile not found" });
    }

    return res.status(200).json(profile);
  } catch (error) {
    console.error("Get HealthProfile by UserId Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Update Health Profile
exports.updateHealthProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const data = req.body;

    const profile = await HealthProfile.findOne({ where: { userId } });

    if (!profile) {
      return res.status(404).json({ message: "Health profile not found" });
    }

    await profile.update(data);
    return res.status(200).json(profile);
  } catch (error) {
    console.error("Update HealthProfile Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Delete Health Profile
exports.deleteHealthProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    const profile = await HealthProfile.findOne({ where: { userId } });

    if (!profile) {
      return res.status(404).json({ message: "Health profile not found" });
    }

    await profile.destroy();
    return res
      .status(200)
      .json({ message: "Health profile deleted successfully" });
  } catch (error) {
    console.error("Delete HealthProfile Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
