import { IUser, SnakeCaseObj } from "@monorepo-example/common";
import { useEffect, useState } from "react";


export function NxWelcome() {
  const [data, setData] = useState<SnakeCaseObj<IUser>>()

  const apiGet = async () => {
    const response = await fetch('http://localhost:3000/api');
    if (response.ok) {
      const data: SnakeCaseObj<IUser> = await response.json();
      setData(data);
    } else {
      console.error('Failed to fetch:', response.statusText);
    }
  };

  useEffect(() => {
    apiGet();
  }, []);


  return (
    <>
      <div>
        Hello
      </div>
      <div>      {data ? JSON.stringify(data, null, 2) : 'Loading...'}
      </div>
    </>
  );
}

export default NxWelcome;
