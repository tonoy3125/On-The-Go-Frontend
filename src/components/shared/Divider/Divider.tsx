import { Divider as AntdDivider } from "antd";

const Divider = () => {
  return (
    <div>
      <AntdDivider variant="dashed" style={{ borderColor: "#7cb305" }} dashed>
        Or sign in with
      </AntdDivider>
    </div>
  );
};

export default Divider;
