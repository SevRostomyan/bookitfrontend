export default function Home() {
    return (
        <section className="md-flex items-center w-full max-w-7xl px-8 py-12 mx-auto box-border">
            <div className="md-w-1/2 text-left md-mt-6 text-center box-border px-8">
                <h2 className="text-primary text-4xl">Välkommen till Städafint AB</h2>
                <p className="text-sm text-gray-600 font-light leading-8">
                    Din partner för professionell städning och hemservice. Vi är dedikerade till att göra ditt hem eller kontor skinande rent och skapa en hälsosam och trivsam miljö. Med vårt engagerade team och års erfarenhet levererar vi skräddarsydda städtjänster av högsta kvalitet.
                    <br/>
                    <strong> Basic Städning:</strong> En grundläggande rengöring för att hålla ditt utrymme fräscht.<br/>
                    <strong> Topp Städning: </strong>En noggrann städning av varje hörn och skrymsle.<br/>
                    <strong>Diamant Städning:</strong> En lyxig och omfattande städning för den ultimata renheten.<br/>
                    <strong>Fönstertvätt:</strong> Kristallklara fönster som ger ditt hem eller kontor ett upplyftande utseende.<br/>

                    Vi älskar det vi gör, och det märks i varje städning. Luta dig tillbaka, låt oss ta hand om det. Kontakta oss nu för att göra ditt liv skinande rent med Städafint.
                </p>
            </div>
            <div className="md-w-1/2 px-8 text-center box-border">
                <img className="md-mt-6 w-full rounded-lg drop-shadow-lg"
                     src="/img/hero-01.jpeg" alt="Städfint"/>
            </div>
        </section>
    );
}
