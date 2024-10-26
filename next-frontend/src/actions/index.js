"use server";

import { redirect } from "next/navigation";
import axios from "axios";

// R E D I R E C T S
export const To_login_page = () => redirect("/auth/login");
export const To_home_page = () => redirect("/");
export const To_profile_page = () => redirect("/user/profile");
export const To_students_page = () => redirect("/students");
export const To_teachers_page = () => redirect("/teachers");
export const To_courses_page = () => redirect("/courses");
export const To_form_fillup_page = () => redirect("/form-fill-up");
export const To_marking_page = () => redirect("/marking");
export const To_result_page = () => redirect("/results");

export const To_TermsAndConditions = () => redirect("/terms-and-conditions");
export const To_PrivacyPolicy = () => redirect("/privacy-policy");


// T O K E N   D E C O D E R
export const decodeToken = (token) => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map((char) => "%" + ("00" + char.charCodeAt(0).toString(16)).slice(-2))
      .join("")
  );
  return JSON.parse(jsonPayload);
};

// F O R   C O N T E X T
export const fetch_user_profile_data = async (authToken) => {
  let response;
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BASEURL}/profile/`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    if (res.data) {
      const data = res.data;
      response = {
        error: false,
        email: data.email,
        name: data.name,
        role: data.role,
        id: data.id,
        info: data
      };
    }
  } catch (error) {
    response = {
      error: true,
      msg: "Failed to fetch profile data",
    };
  }
  return response;
};

// L O G I N   P A G E
export const handle_login = async (postData) => {
  let response;
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASEURL}/login/`,
      postData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (res.data) {
      response = {
        error: false,
        token: res.data.token.access,
        user_id: res.data.user_id,
        msg: "Login successfull",
      };
    }
  } catch (error) {
    response = {
      error: true,
      msg: "Either email or password is invalid!"
    };
  }
  return response;
};

// H O M E   P A G E
export const fetch_students = async () => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BASEURL}/students/`);
    if (res.data) {
      return {
        error: false,
        students: res.data,
      };
    }
  } catch (error) {
    return {
      error: true,
      msg: "Failed to fetch data",
    };
  }
};

export const get_student_cgpa = async (id) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BASEURL}/result/?studentId=${id}&semesterId=0`
    );
    if (res.data) {
      return {
        error: false,
        cgpa: res.data.CGPA,
      };
    }
  } catch (error) {
    return {
      error: false,
      cgpa: 0.0,
    };
  }
};

export const fetch_users = async () => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BASEURL}/users/`);
    if (res.data) {
      return {
        error: false,
        userCount: res.data.length,
        users: res.data,
      };
    }
  } catch (error) {
    return {
      error: true,
      msg: "Failed to fetch data",
    };
  }
};

export const fetch_forms = async (authToken) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BASEURL}/form-fill-ups/`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    if (res.data) {
      return {
        error: false,
        forms: res.data,
      };
    }
  } catch (error) {
    return {
      error: true,
      msg: "Failed to fetch data",
    };
  }
};

// S T U D E N T S
export const create_user = async (postData) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASEURL}/register/`,
      postData,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    if (res.data) {
      return { error: false, userData: res.data };
    }
  } catch (error) {
    return { error: true, msg: "Something is wrong"};
  }
};

export const fetch_halls = async () => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BASEURL}/halls/`);
    if (res.data) {
      return { error: false, halls: res.data };
    }
  } catch (error) {
    return { error: true, msg: "Failed to fetch!" };
  }
};

export const create_students = async (postData) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASEURL}/student/details/`,
      postData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (res.data) {
      return { error: false, msg: "Student has been created successfully" };
    }
  } catch (error) {
    return { error: true, msg: "Something is wrong" };
  }
};

// A D D   T E A C H E R S
export const fetch_teachers = async () => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BASEURL}/teachers/`);
    if (res.data) {
      return { error: false, teachers: res.data };
    }
  } catch (error) {
    return { error: true, msg: "Failed to fetch data" };
  }
};

export const create_teachers = async (postData) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASEURL}/teacher/details/`,
      postData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (res.data) {
      return { error: false, msg: "Teacher has been created successfully" };
    }
  } catch (error) {
    return { error: true, msg: "Something is wrong" };
    console.log(error);
  }
};

// A D D   C O U R S E S
export const fetch_courses = async () => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BASEURL}/courses/`);
    if (res.data) {
      return { error: false, courses: res.data };
    }
  } catch (error) {
    return { error: true, msg: "Failed to fetch data" };
  }
};

export const fetch_semesters_and_departments = async () => {
  try {
    const [semestersRes, deptRes] = await Promise.all([
      axios.get(`${process.env.NEXT_PUBLIC_BASEURL}/semesters/`),
      axios.get(`${process.env.NEXT_PUBLIC_BASEURL}/departments/`),
    ]);

    if (semestersRes.data && deptRes.data) {
      return {
        error: false,
        semesters: semestersRes.data,
        departments: deptRes.data,
      };
    }
  } catch (error) {
    return { error: true, msg: "Failed to fetch data" };
  }
};

export const create_courses = async (postData) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASEURL}/courses/`,
      postData
    );
    if (res.data) {
      return { error: false, msg: "Course has been created successfully" };
    }
  } catch (error) {
    return { error: false, msg: "Something is wrong" };
  }
};

export const assign_teachers_in_theory = async (
  postData_section_A,
  postData_section_B
) => {
  try {
    const [resA, resB] = await Promise.all([
      axios.post(
        `${process.env.NEXT_PUBLIC_BASEURL}/sections/`,
        postData_section_A
      ),
      axios.post(
        `${process.env.NEXT_PUBLIC_BASEURL}/sections/`,
        postData_section_B
      ),
    ]);
    if (resA.data && resB.data) {
      return { error: false, msg: "Teachers has been assigned for the course" };
    }
  } catch (error) {
    return { error: true, msg: "Something went wrong" };
  }
};

export const assign_teachers_in_lab = async (postData_lab) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASEURL}/sections/`,
      postData_lab
    );
    if (res.data) {
      return { error: false, msg: "Teachers has been assigned for the course" };
    }
  } catch (error) {
    return { error: true, msg: "Something went wrong" };
  }
};

// F O R M   F I  L L   U P
export const fetch_semesters = async () => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BASEURL}/semesters/`
    );
    if (res.data) {
      return { error: false, semesters: res.data };
    }
  } catch (error) {
    return { error: true, msg: "Failed to fetch data" };
  }
};

export const create_notice = async (postData, authToken) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASEURL}/form-fill-ups/`,
      postData,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    if (res.data) {
      return { error: false, msg: "Form fill notice is live now" };
    }
  } catch (error) {
    return { error: true, msg: "Something went wrong. Please try again" };
  }
};

export const fetch_sections = async () => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BASEURL}/sections/`);
    if (res.data) {
      return { error: false, sections: res.data };
    }
  } catch (error) {
    return { error: true, msg: "Failed to fetch" };
  }
};

export const add_student_for_form_fillup_from_admin = async (
  postData,
  authToken
) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASEURL}/form-fill-up-information/`,
      postData,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    return { error: false };
  } catch (error) {
    return { error: true, msg: "Something went wrong" };
  }
};

export const get_teacher_id = async (id) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BASEURL}/theid/${id}/`
    );
    if (res.data) {
      return { error: false, teacher_id: res.data.id };
    }
  } catch (error) {
    return { error: true, msg: "Something is wrong" };
  }
};

export const get_student_id = async (id, authToken) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BASEURL}/theid/${id}/`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    if (res.data) {
      return { error: false, student_id: res.data.id };
    }
  } catch (error) {
    return { error: true, msg: "Something went wrong" };
  }
};

export const fetch_teacher_info = async (teacher_id) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BASEURL}/teachers/${teacher_id}/`
    );
    if (res.data) {
      return { error: false, info: res.data };
    }
  } catch (error) {
    return { error: true, msg: "Failed to fetch" };
  }
};

export const fetch_student_info = async (id) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BASEURL}/students/${id}/`
    );
    if (res.data) {
      return { error: false, info: res.data };
    }
  } catch (error) {
    return { error: true, msg: "Failed to fetch" };
  }
};

export const fetch_form_info = async (authToken) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BASEURL}/form-fill-up-information/`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    if (res.data) {
      return { error: false, formInfo: res.data };
    }
  } catch (error) {
    return { error: true, msg: "Failed to fetch" };
  }
};

export const handle_allow_student_by_teacher = async (
  postData,
  id,
  authToken
) => {
  try {
    const res = await axios.patch(
      `${process.env.NEXT_PUBLIC_BASEURL}/form-fill-up-information/${id}/`,
      postData,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    if (res.data) {
      return {
        error: false,
        msg: "This student has been allowed to complete form fill up",
      };
    }
  } catch (error) {
    return { error: true, msg: "Something went wrong" };
  }
};

export const complete_form_fill_up_by_student = async (
  postData,
  id,
  authToken
) => {
  try {
    const res = await axios.patch(
      `${process.env.NEXT_PUBLIC_BASEURL}/form-fill-up-information/${id}/`,
      postData,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    if (res.data) {
      return { error: false, msg: "Completed" };
    }
  } catch (error) {
    return { error: false, msg: "Something went wrong" };
  }
};

// M A R K I N G
export const add_marks = async (postData, id, authToken) => {
  try {
    const res = await axios.patch(
      `${process.env.NEXT_PUBLIC_BASEURL}/form-fill-up-information/${id}/`,
      postData,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    if (res.data) {
      return { error: false, msg: "Mark has been added successfully" };
    }
  } catch (error) {
    return { error: true, msg: "Something went wrong" };
  }
};


// RESULTS
export const get_student_result = async(id, semester) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BASEURL}/result/?studentId=${id}&semesterId=${semester}`
    );
    if (res.data) {
      return {error: false, result: res.data};
    }
  } catch (error) {
    return {error: true, msg: error.response.data.message}
  }
}

export const get_student_year_result = async(id, year) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BASEURL}/year-results/?studentId=${id}&yearId=${year}`
    );
    if (res.data) {
      return {error: false, result: res.data};
    }
  } catch (error) {
    return {error: true, msg: error.response.data.message}
  }
}