const { setGlobalOptions } = require("firebase-functions");
const { https } = require("firebase-functions");
const logger = require("firebase-functions/logger");

setGlobalOptions({ maxInstances: 10 });

// Simple "reminder" function (no email)
exports.sendWaterReminder = https.onCall(async (data, context) => {
  try {
    const userId = data.userId || "unknown user";

    // Log that a reminder was requested
    logger.info(`Water reminder requested for user: ${userId}`);

    // You can return any data to the client
    return {
      success: true,
      message: `Reminder scheduled for ${userId}!`
    };
  } catch (err) {
    // Log any unexpected errors
    logger.error("sendWaterReminder error:", {
      message: err.message,
      stack: err.stack
    });

    throw new https.HttpsError(
      "internal",
      "Failed to process reminder. Check logs."
    );
  }
});
