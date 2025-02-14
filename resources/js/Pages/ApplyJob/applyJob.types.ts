export type ApplyJobForm = {
    job_id: number,
    first_name: string,
    middle_name: string,
    last_name: string,
    email: string,
    phone_number: string,
    address: string,
    documents: Array<File>,
    links: Array<{ label: string, value: string }>
}

