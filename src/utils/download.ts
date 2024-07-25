export default (url: string, name: string) => {
  if (!url) return;
  const link = document.createElement("a");
  link.href = url;
  link.download = name;
  document.body.appendChild(link);
  link.click();
  link.remove();
};
