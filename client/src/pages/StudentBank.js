import { PageHeader } from '../components/Headers';
import { OwnAccount } from '../components/StudentBank';
import Template from '../components/Template';

export default function StudentBank({ position }) {
  return (
    <>
      <Template
        childrenTop={
          <>
            <PageHeader>{position}</PageHeader>
          </>
        }
        childrenBottom={
          <>
            {position === '은행' && <OwnAccount />}
            {}
          </>
        }
      />
    </>
  );
}
