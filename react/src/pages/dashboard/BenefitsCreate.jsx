import React from 'react'
import AppLayout from '../../layout/AppLayout'
import SectionTable from '../../components/sectionTable/SectionTable'
import CreateForm from '../../components/createForm/CreateForm'

export const BenefitsPage = () => {
    return (
        <AppLayout Page={"Benefits"}>
            <CreateForm SectionName={"Beneficios"}></CreateForm>
        </AppLayout>
    )
}

export default BenefitsPage;
