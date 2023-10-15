export async function GET() {
        const headers = new Headers({
            'Content-Type': 'application/json',
            'API-Key': process.env.DATA_API_KEY || '',
        });
        const res = await fetch('https://dummyjson.com/products', { headers });
        const data = await res.json();
     
        return Response.json({ data });
}
