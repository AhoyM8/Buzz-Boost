
type Repository = {
    id: number;
    name: string;
    full_name: string;
};

export default async function Page() {
    const res = await fetch('https://api.github.com/repos/vercel/next.js')
    const data: Repository = await res.json()
    console.log(data.full_name)
    console.log(data)

    return (
        <>
        <div>
            <h1>Next</h1>
            <p>I guess full name is {data.full_name} ⚡️</p>
        </div>
        </>
    );
    }
