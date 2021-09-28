import { useEffect, useState } from 'react';

export const Thumb = ({ file }: { file: File }) => {
  const [thumb, setThumb] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    let reader = new FileReader();

    reader.onloadend = () => {
      setThumb(reader.result as string);
      setLoading(false);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  }, [file]);

  if (!file) {
    return null;
  }

  if (loading) {
    return <p>loading...</p>;
  }

  return (
    <img
      src={thumb}
      alt={file.name}
      className="img-thumbnail mt-2"
      height={200}
      width={200}
    />
  );
};
