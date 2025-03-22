const AdminUser = require("../models/adminuser.model");
const bcrypt = require("bcryptjs");

// Create Admin User
exports.createAdminUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Hash password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    const adminUser = await AdminUser.create({
      name,
      email,
      password: hashedPassword,
      role: role || "admin",
    });

    res.status(201).json({ message: "Admin user created", adminUser });
  } catch (error) {
    res.status(500).json({ message: "Error creating admin user", error });
  }
};

// Get All Admin Users
exports.getAllAdminUsers = async (req, res) => {
  try {
    const adminUsers = await AdminUser.findAll();
    res.status(200).json(adminUsers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching admin users", error });
  }
};

// Get Admin User by ID
exports.getAdminUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const adminUser = await AdminUser.findByPk(id);

    if (!adminUser) {
      return res.status(404).json({ message: "Admin user not found" });
    }

    res.status(200).json(adminUser);
  } catch (error) {
    res.status(500).json({ message: "Error fetching admin user", error });
  }
};

// Update Admin User
exports.updateAdminUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, role } = req.body;

    const adminUser = await AdminUser.findByPk(id);
    if (!adminUser) {
      return res.status(404).json({ message: "Admin user not found" });
    }

    if (password) {
      req.body.password = await bcrypt.hash(password, 10);
    }

    await adminUser.update(req.body);
    res.status(200).json({ message: "Admin user updated", adminUser });
  } catch (error) {
    res.status(500).json({ message: "Error updating admin user", error });
  }
};

// Delete Admin User
exports.deleteAdminUser = async (req, res) => {
  try {
    const { id } = req.params;
    const adminUser = await AdminUser.findByPk(id);

    if (!adminUser) {
      return res.status(404).json({ message: "Admin user not found" });
    }

    await adminUser.destroy();
    res.status(200).json({ message: "Admin user deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting admin user", error });
  }
};
