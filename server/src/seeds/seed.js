const Role = require("../Models/Role.model");
const User = require("../Models/User.model");
const Priority = require("../Models/Priority.model");
const TaskType = require("../Models/TaskType.model");
const bcrypt = require("bcryptjs");
const ProjectCategory = require("../Models/ProjectCategory.model");

// Seed Roles
const seedRoles = async () => {
  const roles = ["admin", "user", "manager"];
  for (const role of roles) {
    const exists = await Role.findOne({ name: role });
    if (!exists) {
      await Role.create({ name: role, deleted: false, alias: role });
    }
  }
};

// Seed Users
const seedUsers = async () => {
  const userRole = await Role.findOne({ name: "user" });
  const adminRole = await Role.findOne({ name: "admin" });
  const managerRole = await Role.findOne({ name: "manager" });

  if (!userRole || !adminRole || !managerRole) {
    return;
  }

  const users = [
    {
      username: "admin123",
      first_name: "Admin",
      last_name: "User",
      email: "admin@gmail.com",
      password: "admin",
      phone: "123456789",
      birth_day: new Date("1990-01-01"),
      gender: "male",
      role: adminRole._id,
    },
    {
      username: "user123",
      first_name: "Regular",
      last_name: "User",
      email: "user@gmail.com",
      password: "user",
      phone: "987654321",
      birth_day: new Date("1995-05-15"),
      gender: "female",
      role: userRole._id,
    },
    {
      username: "manager123",
      first_name: "Manager",
      last_name: "User",
      email: "manager@gmail.com",
      password: "manager",
      phone: "555666777",
      birth_day: new Date("1985-07-20"),
      gender: "male",
      role: managerRole._id,
    },
  ];

  for (const userData of users) {
    const exists = await User.findOne({ email: userData.email });
    if (!exists) {
      userData.password = await bcrypt.hash(userData.password, 10);
      await User.create(userData);
    }
  }
};

// Seed Priorities
const seedPriorities = async () => {
  const priorities = [
    {
      id: 1,
      name: "Low",
      description: "Low priority",
      alias: "low",
      deleted: "false",
    },
    {
      id: 2,
      name: "Medium",
      description: "Medium priority",
      alias: "medium",
      deleted: "false",
    },
    {
      id: 3,
      name: "High",
      description: "High priority",
      alias: "high",
      deleted: "false",
    },
    {
      id: 4,
      name: "Urgent",
      description: "Urgent priority",
      alias: "urgent",
      deleted: "false",
    },
  ];

  for (const priority of priorities) {
    const exists = await Priority.findOne({ id: priority.id });
    if (!exists) {
      await Priority.create(priority);
    }
  }
};

// Seed Task Types
const seedTaskTypes = async () => {
  const taskTypes = [
    { id: 1, name: "Bug" },
    { id: 2, name: "Feature" },
    { id: 3, name: "Improvement" },
    { id: 4, name: "Task" },
  ];

  for (const taskType of taskTypes) {
    const exists = await TaskType.findOne({ id: taskType.id });
    if (!exists) {
      await TaskType.create(taskType);
    }
  }
};

// Seed Project Category
const seedProjectCategory = async () => {
  const projectCategories = [
    { name: "Web Application" },
    { name: "Mobile Application" },
    { name: "Desktop Application" },
    { name: "Game" },
    { name: "Other" },
  ];

  for (const projectCategory of projectCategories) {
    const exists = await ProjectCategory.findOne({
      name: projectCategory.name,
    });
    if (!exists) {
      await ProjectCategory.create(projectCategory);
    }
  }
};
// Chạy tất cả các seed functions
const runSeed = async () => {
  console.log("Start seed data...");
  await seedRoles();
  await seedUsers();
  await seedPriorities();
  await seedTaskTypes();
  await seedProjectCategory();
  console.log("Seed data completed.");
};

module.exports = {
  runSeed,
  seedRoles,
  seedUsers,
  seedPriorities,
  seedTaskTypes,
};

// Chạy seed nếu file được thực thi trực tiếp
if (require.main === module) {
  runSeed();
}
