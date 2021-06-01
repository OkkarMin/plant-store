// Require our Telegram helper package
import type { NextApiRequest, NextApiResponse } from "next";
import TelegramBot from "node-telegram-bot-api";

module.exports = async (request: NextApiRequest, response: NextApiResponse) => {
  // https://github.com/yagop/node-telegram-bot-api/issues/319#issuecomment-324963294
  // Fixes an error with Promise cancellation
  process.env.NTBA_FIX_319 = "test";
  try {
    // Create our new bot handler with the token
    // that the Botfather gave us
    // Use an environment variable so we don't expose it in our code
    const bot = new TelegramBot(process.env.TELEGRAM_TOKEN!);

    // Retrieve the POST request body that gets sent from Telegram
    const { body } = request;

    // Ensure that this is a message being sent
    if (body.message) {
      // Retrieve the ID for this chat
      // and the text that the user sent
      const {
        chat: { id, ids, username, first_name },
        text: message,
      } = body.message;

      // Send our new message back in Markdown
      await bot.sendMessage(id, message, { parse_mode: "Markdown" });
      ids.map(
        async (id: number) =>
          await bot.sendMessage(id, message, { parse_mode: "Markdown" })
      );

      await bot.sendMessage(214260361, `${id} ${username} ${first_name}`, {
        parse_mode: "Markdown",
      });
    }
  } catch (error) {
    // If there was an error sending our message then we
    // can log it into the Vercel console
    console.error("Error sending message");
    console.log(error.toString());
  }

  // Acknowledge the message with Telegram
  // by sending a 200 HTTP status code
  response.send("OK");
};