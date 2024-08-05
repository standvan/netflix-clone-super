export const validateRegisterForm = (datas) => {
  let errors = {};
  if (!datas.fullname) {
    errors.fullname = "Fullname is required";
  }
  if (!datas.email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(datas.email)) {
    errors.email = "Email is invalid";
  }
  if (!datas.password) {
    errors.password = "Password is required";
  } else if (datas.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }
  return errors;
};
export const validateLoginForm = (datas) => {
  let errors = {};
  if (!datas.email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(datas.email)) {
    errors.email = "Email is invalid";
  }
  if (!datas.password) {
    errors.password = "Password is required";
  } else if (datas.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }
  return errors;
};
export const validateChangePass = (datas) => {
  let errors = {};
  if (!datas.password) {
    errors.password = "Password is required";
  } else if (datas.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  if (!datas.newPassword) {
    errors.newPassword = "Password is required";
  } else if (datas.password.length < 6) {
    errors.newPassword = "Password must be at least 6 characters";
  } else if (datas.newPassword !== datas.confirmPassword) {
    errors.newPassword = "Password doesn't match confirm password";
  }

  if (!datas.confirmPassword) {
    errors.confirmPassword = "Password is required";
  } else if (datas.newPassword !== datas.confirmPassword) {
    errors.confirmPassword = "Password doesn't match confirm password";
  }

  return errors;
};
export const validateMovie = (datas) => {
  let errors = {};
  if (!datas.name) {
    errors.name = "Name is required";
  }
  if (!datas.time) {
    errors.time = "Time is required";
  } else if (!/^\d+$/.test(datas.time)) {
    errors.time = "Time must be a number";
  }
  if (!datas.language) {
    errors.language = "Language is required";
  }
  if (!datas.year) {
    errors.year = "Year is required";
  } else if (!/^\d+$/.test(datas.year)) {
    errors.year = "Year must be a number";
  }
  if (!datas.desc) {
    errors.desc = "Description is required";
  }
  if (!datas.titleImage) {
    errors.titleImage = "Image without title is required";
  }
  if (!datas.image) {
    errors.image = "Image with title is required";
  }
  if (!datas.video) {
    errors.video = "Video is required";
  }
  if (!datas.category) {
    errors.category = "No category selected";
  }
  return errors;
};
