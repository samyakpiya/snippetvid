"use server";

export const howToPost = async () => {
  try {
    const response = await fetch(process.env.CLOUD_WAYS_POST as string);

    if (!response.ok) return { status: 400 };

    const data = await response.json();

    if (data) {
      return {
        title: data[0].title.rendered,
        content: data[0].content.rendered,
      };
    }
  } catch (error) {
    console.log(error);
    return { status: 400 };
  }
};
