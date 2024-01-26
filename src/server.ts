import mongoose from "mongoose";
import config from "./config/index";
import app from "./app";

async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log("Database coonnection is successfull!");

    app.listen(config.port, () => {
      console.log(`App listening to port ${config.port}`);
    });
  } catch (error) {
    console.warn("Database connection failed", error);
  }
}

bootstrap();
