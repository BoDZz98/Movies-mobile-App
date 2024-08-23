const headers = {
  "Content-Type": "application/json",
};
// Auth-----------------------------------------------------------------------------
export const signUp = async (email, password, name) => {
  const response = await fetch("http://192.168.1.9:8000/auth/signup", {
    headers,
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });
  // if email is not already used
  if (response.ok) {
    // console.log("Data is", await response.json());
    const res = await login(email, password);
    return res;
  }
  // if email is already used
  if (response.status === 400||response.status === 500) {
    console.log("error is", await response.json());
  }
};

export const login = async (email, password) => {
  const response = await fetch("http://192.168.1.9:8000/auth/login", {
    headers,
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  return response;
};
//-------------------------------------------------------------------------------------
// Reviews-----------------------------------------------------------------------------

export const getUserReviews = async (email) => {
  const res = await fetch(
    "http://192.168.1.9:8000/reviews/getUserReviews/" + email,
    {
      headers,
    }
  );
  if (res.ok) {
    const data = await res.json();
    return data.userReviews;
  }
};
