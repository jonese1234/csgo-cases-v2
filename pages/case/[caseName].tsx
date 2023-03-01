import { useRouter } from "next/router";
import { GetAllCasesData, GetCaseData } from "../../components/shared/api-manager";
import  Error from "next/error"
import { CaseMapper } from "../../components/CasePage/models/case.model";
import CaseHeader from "../../components/CasePage/CaseHeader/CaseHeader";
import CaseWrapper from "../../components/CasePage/CaseContent/CaseWrapper";
import styles from '../../styles/case.module.css'
import Head from "next/head";
import { GetStaticPaths, GetStaticProps } from 'next';
import { FilterContext } from "../../components/Contexts/MarketContext";
import { useState } from "react";
import { GridFilterModel } from "@mui/x-data-grid";


function CasePage() {
    const [filters, setFilters] = useState<GridFilterModel>({
        items:[
            {
                columnField: 'market',
                operatorValue: 'equals',
                value: 'Steam'
            }
        ]
    }); 
    
    const router = useRouter();
    const { caseName } = router.query;
    if(caseName === undefined) return <div>Loading...</div>

    let cn = caseName as string;
    var replaced = cn.split('-').join(' ');
    const { data, isLoading, isError } = GetCaseData(replaced as string);
    if (isLoading) return <div>Loading...</div>
    if(isError) return <Error statusCode={404} />

    let marketName = filters.items[0].value;
    let c = CaseMapper(data, marketName);

    return(
        <FilterContext.Provider value={{ filters, setFilters }}>
            <div className={styles.background}>
                    <Head>
                        <title>{c.name}</title>
                        <meta name="description" content={c.name}/>
                        <link rel="icon" href="/favicon.ico" />
                    </Head>
                <main className={styles.container}>
                    <CaseHeader caseData={c}></CaseHeader>
                    <CaseWrapper data={c}></CaseWrapper>
                </main>
            </div>
        </FilterContext.Provider>
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