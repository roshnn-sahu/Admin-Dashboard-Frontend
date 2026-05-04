import Spinner from "../components/ui/Spinner";

export const ShowPhone = ({ mobile }) => {
  if (!mobile) return <Spinner />;
  return (
    <>
      <a href={`tel:${mobile}`}>{mobile}</a>
    </>
  );
};

export const ShowEmail = ({ email }) => {
  if (!email) return <Spinner />;
  return (
    <>
      <a href={`mailto:${email}`}>{email}</a>
    </>
  );
};
