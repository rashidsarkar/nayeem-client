/* eslint-disable react/prop-types */
function ErrorMessage({ error }) {
  return (
    <p>
      Error: {error.message}. Status:{" "}
      {error.response?.statusText || "Unknown status"}
    </p>
  );
}

export default ErrorMessage;
