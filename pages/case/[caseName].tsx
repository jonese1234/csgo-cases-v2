import { useRouter } from "next/router";
import { GetCaseData } from "../../components/shared/api-manager";
import  Error from "next/error"
import { CaseMapper } from "../../components/CasePage/models/case.model";
import CaseHeader from "../../components/CasePage/CaseHeader/CaseHeader";
import CaseWrapper from "../../components/CasePage/CaseContent/CaseWrapper";
import styles from '../../styles/case.module.css'
import Head from "next/head";


function CasePage() {
    const router = useRouter();
    const { caseName } = router.query;
    if(caseName === undefined) return <div>Loading...</div>

    let cn = caseName as string;
    var replaced = cn.split('-').join(' ');
    const { data, isLoading, isError } = GetCaseData(replaced as string);

    console.log("Page", data)
    console.log("Page", isLoading)
    console.log("Page", isError)

    if (isLoading) return <div>Loading...</div>
    if(isError) return <Error statusCode={404} />

    let c = CaseMapper(data);
    console.log(c);

    return(
        <div className={styles.background}>
                  <Head>
                    <title>{replaced}</title>
                    <meta name="description" content={replaced}/>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
            <main className={styles.container}>
                <CaseHeader data={c}></CaseHeader>
                <CaseWrapper data={c}></CaseWrapper>
            </main>
        </div>
    );
}

export default CasePage;