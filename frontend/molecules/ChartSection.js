import PropTypes from 'prop-types';
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { AiFillInfoCircle } from "react-icons/ai";
import Tooltip from './ToolTip';

const ChartSection = ({
  title,
  tooltip,
  chartOptions,
  chartSeries = [],
  className = '',
  height = 280,
  width = '100%'
}) => {
  return (
    <div className={`w-full grow max-w-[250px] py-4 font-inter xl:shrink-0 ${className}`}>
      <div className="flex items-center gap-1 ml-8 mb-6">
        <p className="text-[13px] font-medium leading-[1.2] text-neutral-4">
          {title}
        </p>
        <Tooltip
          className="text-xs"
          title={<AiFillInfoCircle className="text-neutral-4" />}
          content={tooltip || title}
          position="top"
        />
      </div>
      <div>
        <Chart
          options={chartOptions}
          series={chartSeries}
          type="donut"
          height={height}
          width={width}
          id="donut-chart"
        />
      </div>
    </div>
  );
}

export default ChartSection;

ChartSection.propTypes = {
  className: PropTypes.string,
  title : PropTypes.string,
  tooltip : PropTypes.string,
  chartOptions: PropTypes.object,
  chartSeries : PropTypes.array,
};
