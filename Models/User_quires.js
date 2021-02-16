//import krdne file knex ka connectionman drust krdwa lagal database
const bcrypt = require("bcrypt");
const knex = require("../db/knex");

module.exports = {
  getuser: {
    //bo wargrtnaway hamu userakan
    All: function () {
      return knex.select().from("users");
    },
    //bo wargrtnaway user ba pey email
    byEmail: async function (email) {
      return knex.select().from("users").where("email", email).first();
    },
    //bo wargrtnaway user ba pey ID
    byID: function (ID) {
      return knex.select().from("users").where("id", ID).first();
    },
    //bo wargrtnaway user ba pey username
    byUserName: function (userName) {
      return knex.select().from("users").where("user_name", userName).first();
    },
  },
  //bo tomarkrdni user
  setuser: async function (user_name, email, password) {
    const salt = await bcrypt.genSalt(10);
    console.log(password);
    password = await bcrypt.hash(password, salt);
    return knex("users").insert([{ user_name, email, password }]);
  },
  validatePassword: async function (email, password) {
    return await this.getuser.byEmail(email).then(async (user) => {
      return await bcrypt.compare(password, user.password);
    });
  },
  updateVerifyEmail: async (id) => {
    return knex("users")
      .where("id", "=", id)
      .update({ verify: true })
      .clearCounters();
  },
};
