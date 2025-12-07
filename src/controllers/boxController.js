import { makeBox } from "../models/box.js";
import { listBoxes, saveBox } from "../services/api/boxApi.js";

export function validateBox({ receiver, weight, country }) {
  const errors = {};
  if (!receiver || !receiver.trim())
    errors.receiver = "Receiver name is required.";
  if (weight === "" || isNaN(Number(weight)))
    errors.weight = "Weight is required";
  if (Number(weight) < 0)
    errors.weight = "Negative weight is not premitted. Reset to 0";
  if (!country) errors.country = "Destination country is required";
  return errors;
}

export const createBox = async (form, dispatch) => {
  const errors = validateBox(form);
  if (Object.keys(errors).length) return { ok: false, errors };
  const box = makeBox(form);
  const saved = await saveBox(box);
  dispatch({ type: "ADD_SUCCESS", box: saved });
  dispatch({ type: "NAVIGATE", view: "list" });
  return { ok: true };
};

export const loadAllBoxes = async (dispatch) => {
  try {
    dispatch({ type: "LOAD_START" });
    const boxes = await listBoxes();
    dispatch({ type: "LOAD_SUCCESS", boxes });
  } catch (e) {
    dispatch({ type: "LOAD_ERROR", error: String(e) });
  }
};
