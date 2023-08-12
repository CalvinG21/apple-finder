import SearchResultsTable from './SearchResultstable';
import SelectionForm from './SelectionForm';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

let SearchPage=()=>{
    return(
    <>
        <Container>
            <Row className='my-3'>
                <Col md={{ span: 10, offset: 1 }}>
                    <h1>Apple Finder</h1>
                    <small>Get all the latest and classic movies,eBooks and music now!</small>
                </Col>
            </Row>
            <Row className='my-4'>
                <Col md={{ span: 8, offset: 2 }}>
                    <SelectionForm></SelectionForm>
                </Col>
            </Row>
            <Row className='mt-5'>
                <Col md={{ span: 8, offset: 2 }}>
                    <SearchResultsTable></SearchResultsTable>
                </Col>
            </Row>
        </Container>
    </>
    )
}

export default SearchPage;