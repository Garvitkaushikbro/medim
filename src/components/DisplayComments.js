import styles from "./DisplayComments.module.css";

function DisplayComments({ comments }) {
  console.log("from display comments", comments);
  return (
    <div className={styles.displayComments}>
      {comments.map((c) => (
        <div className={styles.comment}>
          <div>c.commentAuthorId</div>
          <div>c.text</div>
        </div>
      ))}
    </div>
  );
}

export default DisplayComments;
