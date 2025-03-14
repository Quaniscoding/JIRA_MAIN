import { Table, ConfigProvider, Empty } from "antd";
import PropTypes from "prop-types";

const ReusableTable = ({
  columns,
  dataSource,
  loading = false,
  pagination = {},
  rowKey = "id",
  className = "",
  bordered = false,
  size = "middle",
  onRowClick,
  scroll,
  expandable,
  rowSelection,
  ...rest
}) => {
  const customizeRenderEmpty = () => <Empty />;

  return (
    <ConfigProvider
      renderEmpty={customizeRenderEmpty}
      theme={{
        token: {
          colorPrimary: "#3b82f6",
          borderRadius: 6,
          fontFamily: "Inter, sans-serif",
        },
        components: {
          Table: {
            headerBg: "#f1f5f9",
            headerColor: "#1e293b",
            rowHoverBg: "#f9fafb",
          },
        },
      }}
    >
      <div className="w-full overflow-x-auto">
        <Table
          columns={columns}
          dataSource={dataSource}
          loading={loading}
          pagination={{
            ...pagination,
            showSizeChanger: true,
            pageSizeOptions: ["10", "20", "50", "100"],
            position: ["bottomRight"],
            className: "mt-4",
          }}
          rowKey={rowKey}
          bordered={bordered}
          size={size}
          className={`w-full ${className}`}
          scroll={scroll ?? { x: "max-content" }}
          expandable={expandable}
          rowSelection={rowSelection}
          onRow={(record, index) => ({
            onClick: () => onRowClick?.(record, index),
            className: onRowClick ? "cursor-pointer" : "",
          })}
          {...rest}
        />
      </div>
    </ConfigProvider>
  );
};

export default ReusableTable;

ReusableTable.propTypes = {
  columns: PropTypes.array.isRequired,
  dataSource: PropTypes.array.isRequired,
  loading: PropTypes.bool,
  pagination: PropTypes.object,
  rowKey: PropTypes.string,
  className: PropTypes.string,
  bordered: PropTypes.bool,
  size: PropTypes.string,
  onRowClick: PropTypes.func,
  scroll: PropTypes.object,
  expandable: PropTypes.object,
  rowSelection: PropTypes.object,
};
