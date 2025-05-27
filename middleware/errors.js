export const errorHandler = (err, req, res, next) => {
  console.error(err); // logs the full error

  let statusCode = err.statusCode || 500;

  if (err.name.includes( "Sequelize")) statusCode = 400;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};
export const notFound = (req, res) => {
  let statusCode = 404;
  {
    return res.status(statusCode).json({
      message: "Page Not Found",
    });
  }
};
