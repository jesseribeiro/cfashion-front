const downloadExcel = (response) => {
  const url = window.URL.createObjectURL(
    new Blob([response.data])
  );
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute(
    "download",
    response.headers["content-disposition"]
      .split(";")[1]
      .split("=")[1]
  );
  document.body.appendChild(link);
  link.click();
}

export default {
  downloadExcel: downloadExcel
}