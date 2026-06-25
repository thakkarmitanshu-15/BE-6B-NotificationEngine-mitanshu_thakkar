import { Request, Response } from "express";
import {
getUserPreferences,
updateUserPreferences,
} from "../services/preferenceService";

interface PreferenceParams {
id: string;
}

export async function getPreferences(
req: Request<PreferenceParams>,
res: Response
) {
const userId = req.params.id;

const preferences = await getUserPreferences(userId);

if (!preferences) {
return res.status(404).json({
message: "User not found",
});
}

return res.json(preferences);
}

export async function updatePreferences(
req: Request<PreferenceParams>,
res: Response
) {
const userId = req.params.id;

const updated = await updateUserPreferences(
userId,
req.body
);

return res.json(updated);
}
