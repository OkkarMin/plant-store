// Require our Telegram helper package
import type { NextApiRequest, NextApiResponse } from "next";
// @ts-ignore
import TelegramBot from "node-telegram-bot-api";

let MESSAGE_RECEIVERS: string[] = [];

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
        chat: { id },
        text: message,
      } = body.message;

      // Only admin can send /addUser {id} command
      const isAdmin: boolean = id == process.env.TELEGRAM_ADMIN;
      if (isAdmin && message.startsWith("/addUser")) {
        const idToAdd = message.split(" ")[1];
        console.log("idToAdd", idToAdd);

        // TODO: store idToAdd in database
        MESSAGE_RECEIVERS.push(idToAdd);

        await bot.sendMessage(id, `Current receivers:\n ${MESSAGE_RECEIVERS}`);

        console.log(MESSAGE_RECEIVERS);
      }

      // Return chatID back to user
      message.startsWith("/getID") &&
        (await bot.sendMessage(id, `Your chatID is : ${id}`));

      // Send message to receivers
      MESSAGE_RECEIVERS.map(async (id) => {
        await bot.sendMessage(parseInt(id), message, {
          parse_mode: "Markdown",
        });
      });

      console.log(MESSAGE_RECEIVERS);
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
