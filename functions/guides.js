exports.handler = async (event, context) => {
  const guides = [
    { title: "Beat all Zelda bosses like a boss", author: "mario" },
    { title: "Mario Kart shortcuts you never knew existed", author: "luigi" },
    { title: "Ultimate Street Fighter guide", author: "chun-li" },
  ];

  if (context.clientContext.user) {
    return {
      statusCode: 200,
      body: JSON.stringify(guides),
    };
  }

  return {
    statusCode: 401,
    body: JSON.stringify({ msg: "You must login to see our guides." }),
  };
};
