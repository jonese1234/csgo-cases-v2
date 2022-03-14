import { useRouter } from "next/router";
import { GetAllCasesData, GetCaseData } from "../../components/shared/api-manager";
import  Error from "next/error"
import { CaseMapper } from "../../components/CasePage/models/case.model";
import CaseHeader from "../../components/CasePage/CaseHeader/CaseHeader";
import CaseWrapper from "../../components/CasePage/CaseContent/CaseWrapper";
import styles from '../../styles/case.module.css'
import Head from "next/head";
import { GetStaticPaths, GetStaticProps } from 'next';


function CasePage() {
    //if (isLoading) return <div>Loading...</div>
    //if(isError) return <Error statusCode={404} />
    const router = useRouter();
    const { caseName } = router.query;
    console.log("Page", caseName)
    if(caseName === undefined) return <div>Loading...</div>

    let cn = caseName as string;
    var replaced = cn.split('-').join(' ');
    const { data, isLoading, isError } = GetCaseData(replaced as string);
    console.log("Page", data)
    console.log("Page", isLoading)
    console.log("Page", isError)
    if (isLoading) return <div>Loading...</div>
   //if(isError) return <Error statusCode={404} />
    let c = CaseMapper(data);
    console.log(c);

    return(
        <div className={styles.background}>
                  <Head>
                    <title>{c.name}</title>
                    <meta name="description" content={c.name}/>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
            <main className={styles.container}>
                <CaseHeader data={c}></CaseHeader>
                <CaseWrapper data={c}></CaseWrapper>
            </main>
        </div>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    const res = await fetch('https://raw.githubusercontent.com/jonese1234/Csgo-Case-Data/master/latest.json');
    const posts = await res.json();
    const data = posts['cases'];
    let paths = [];
    for (const x in data) {
        paths.push({params: { caseName: (data[x]['name']).split(' ').join('-') }});
    }
    return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async context => {
    // const res = await fetch('https://raw.githubusercontent.com/jonese1234/Csgo-Case-Data/master/latest.json');
    // const posts = await res.json();
    // const cases = posts['cases'];

    // const cn = context.params?.caseName as string || '';
    // var replaced = cn.split('-').join(' ');
    // const data = cases[replaced]
    // return { props: { data: data ?? null } };
    return {props: {data: null}}
};

export default CasePage;