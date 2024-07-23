/* eslint-disable @typescript-eslint/no-explicit-any */
import scrollByClassName from "@/utils/scrollByClassName";

const validateForm = async (schema: any, data: any) => {
  try {
    await schema.validate(data, {
      abortEarly: false,
    });

    return {};
  } catch (error: any) {
    const errorMessages: { [key: string]: string } = {};

    error.inner.forEach((item: any) => {
      errorMessages[item.path] = item.message;
    });

    return errorMessages;
  } finally {
    scrollByClassName();
  }
};

export default validateForm;
