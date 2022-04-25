import { useState, useEffect } from 'react';
import { create as ipfsHttpClient } from 'ipfs-http-client';

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0');

export function useForm(initial = {}) {
  const [inputs, setInputs] = useState(initial);

  const initialValues = Object.values(initial).join('');

  useEffect(() => {
    setInputs(initial);
  }, [initialValues]);

  async function handleChange(e) {
    let { value, name, type } = e.target;
    if (type === 'number') {
      value = parseFloat(value);
    }
    // if (type === 'file') {
    //   [value] = await uploadToIpfs(e);
    // }
    setInputs({
      ...inputs,
      [name]: value,
    });
  }

  const uploadToIpfs = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const added = await client.add(file, {
        progress: (prog) => console.log(`received: ${prog}`),
      });

      let url = `https://ipfs.infura.io/ipfs/${added.path}`;
      console.log(url);

      setInputs({
        ...inputs,
        image: url,
      });
      return url;
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  };

  function resetForm() {
    setInputs(initial);
  }

  function clearForm() {
    const blankState = Object.fromEntries(
      Object.entries(inputs).map(([key, value]) => [key, ''])
    );

    setInputs(blankState);
  }

  return {
    inputs,
    handleChange,
    uploadToIpfs,
    resetForm,
    clearForm,
  };
}
