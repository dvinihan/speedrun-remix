import { Segment } from "@prisma/client";
import ReactModal from "react-modal";
import { Form } from "remix";
import { useToggle } from "~/hooks/useToggle";

type Props = {
  segment: Segment;
};

export function EditableSegmentItem({ segment }: Props) {
  const { name, id } = segment;

  const [showDeleteModal, toggleDeleteModal] = useToggle(false);

  return (
    <div>
      <input name="id" value={id} hidden readOnly />
      <input defaultValue={name} name="name" />
      <button onClick={toggleDeleteModal} type="button">
        Delete
      </button>

      {/* the modal renders outside of the editSegments Form, so we should use a new Form here */}
      <ReactModal ariaHideApp={false} isOpen={showDeleteModal}>
        Are you sure you want to delete the &quot;{name}&quot; segment?
        <Form action={`/editSegments/delete`} method="post">
          <input name="id" value={id} hidden readOnly />
          <button type="submit">Yes</button>
          <button onClick={toggleDeleteModal} type="button">
            No!!
          </button>
        </Form>
      </ReactModal>
    </div>
  );
}
