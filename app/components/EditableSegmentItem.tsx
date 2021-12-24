import { Segment } from "@prisma/client";
import ReactModal from "react-modal";
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
      <button type="button" onClick={toggleDeleteModal}>
        Delete
      </button>
      <ReactModal isOpen={showDeleteModal} onAfterClose={toggleDeleteModal}>
        <div>
          Are you sure you want to delete the &quot;{name}&quot; segment?
          <button
            onClick={toggleDeleteModal}
            formAction={`/editSegments/delete?id=${id}`}
            formMethod="post"
            type="submit"
          >
            Yes
          </button>
          <button onClick={toggleDeleteModal}>No!!</button>
        </div>
      </ReactModal>
    </div>
  );
}
