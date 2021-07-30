const options = {
  day: 'numeric',
  month: 'short', // also numeric
  year: 'numeric',
};

export default function formatDate(dateString) {

  const locale = navigator.language;

  let result = new Intl.DateTimeFormat(
    locale,
    options
  ).format(new Date(dateString))


  return result
}