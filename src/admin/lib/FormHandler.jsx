//hander for number only
export const handleNumberChange = (e, setState) => {
  const { name, value } = e.target;
  if (/^\d*$/.test(value)) {
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
};
//hander for text
export const handleTextChange = (e, setState) => {
  const { name, value } = e.target;
  setState((prev) => ({
    ...prev,
    [name]: value,
  }));
};

export const handleImageChange = (e, setState,setPreview) => {
  const { name } = e.target;
  const file = e.target.files[0];
  if (file) {
    const imageUrl = URL.createObjectURL(file);

    setPreview((prevData) => ({
      ...prevData,
      [name]: imageUrl,
    }));
    // Update state properly
    setState((prevData) => ({
      ...prevData,
      [name]: file,
    }));
  }
};
