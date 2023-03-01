import useSWR from 'swr'

const fetcher = (resource: RequestInfo, init: RequestInit | undefined) => fetch(resource, init).then(res => res.json())

export function GetAllData(){
    //const { data, error } = useSWR('https://raw.githubusercontent.com/jonese1234/Csgo-Case-Data/5f86512ed42ef12d6bc5e93b7c1e2923b2e6d17c/history/2023-02-28%2023%3A50%3A45Z.json', fetcher)
    const { data, error } = useSWR('https://raw.githubusercontent.com/jonese1234/Csgo-Case-Data/master/latest.json', fetcher)
    return {
        data: data,
        isLoading: !error && !data,
        isError: error
    }
}

export function GetAllCasesData(){
    const { data, isLoading, isError } = GetAllData();

    if(isLoading || isError) {
        return {
            data: data,
            isLoading: isLoading,
            isError: isError
        }
    }

    return {
        data: data['Cases'] ?? data,
        isLoading: isLoading,
        isError: isError
    }
}

export function GetCaseData(name: string){
    const { data, isLoading, isError } = GetAllCasesData();
    if(isLoading || isError) {
        return {
            data: data,
            isLoading: isLoading,
            isError: isError
        }
    }

    if(data == null){
        return {
            data: null,
            isLoading: true,
            isError: isError
        }
    }

    let x = data.find((item: { Name: string; }) => {
        return item.Name == name
    })

    if (x){
        return {
            data: x,
            isLoading: isLoading,
            isError: isError
        }
    }

    return {
        data: null,
        isLoading: isLoading,
        isError: isError
    }
}

export function GetUpdateTimestamp(){
    const { data, isLoading, isError } = GetAllData();

    if(isLoading || isError) {
        return {
            data: data,
            isLoading: isLoading,
            isError: isError
        }
    }

    return {
        data: data['Timestamp'] ?? data,
        isLoading: isLoading,
        isError: isError
    }
}