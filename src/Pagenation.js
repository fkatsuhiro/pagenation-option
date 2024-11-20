import React, { useState } from 'react';
import { Pagination, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const data = Array.from({ length: 100 }, (_, i) => `Item ${i + 1}`); // ダミーデータ

const PaginatedTable = () => {
  const [currentPage, setCurrentPage] = useState(1); // 現在のページ
  const itemsPerPage = 10; // 1ページに表示するアイテム数

  // 現在のページに表示するデータを計算
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = data.slice(indexOfFirstItem, indexOfLastItem);

  // ページ数を計算
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // ページ変更時のハンドラ
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div style={{width: '80%', margin: '0 auto'}}>
      <h3>Pagination Option</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Item</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item, index) => (
            <tr key={index}>
              <td>{indexOfFirstItem + index + 1}</td>
              <td>{item}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Pagination コンポーネント */}
      <Pagination style={{width: '50%', margin: '0 auto'}}>
        <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
        <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
        {Array.from({ length: totalPages }, (_, index) => (
          <Pagination.Item
            key={index}
            active={index + 1 === currentPage}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
        <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
      </Pagination>
    </div>
  );
};

export default PaginatedTable;
