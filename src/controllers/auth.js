import { ONE_DAY } from "../constants/index.js";
import {
  loginUser,
  logoutUser,
  refreshUsersSession,
  registerUser,
} from "../services/auth.js";

export const registerUserController = async (req, res) => {
  const user = await registerUser(req.body);

  res.status(201).json({
    status: 201,
    message: "Succesfully registered a user!",
    data: user,
  });
};

export const loginUserController = async (req, res) => {
  const session = await loginUser(req.body);

  res.cookie("refreshToken", session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });
  res.cookie("sessionId", session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });

  res.json({
    status: 200,
    message: "Successfully logged in an user!",
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const logoutUserController = async (req, res) => {
  try {
    const cookies = req.cookies || {};
    if (!cookies.refreshToken || !cookies.sessionId) {
      return res.status(400).json({ message: "Missing cookies" });
    }

    const sessionId = cookies.sessionId.replace(/^j%3A%22|%22$/g, "");
    await logoutUser(sessionId);

    res.clearCookie("sessionId");
    res.clearCookie("refreshToken");
    return res.status(204).send();
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const setupSession = (res, session) => {
  res.cookie("refreshToken", session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });
  res.cookie("sessionId", session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });
};

export const refreshUserSessionController = async (req, res) => {
  if (!req.cookies.refreshToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const session = await refreshUsersSession({
    sessionId: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });

  setupSession(res, session);

  res.json({
    status: 200,
    message: "Successfully refreshed a session!",
    data: {
      accessToken: session.accessToken,
    },
  });
};
