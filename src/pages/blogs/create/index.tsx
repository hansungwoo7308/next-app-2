const Create = () => {
  return (
    <>
      <main className="blogs-create">
        <section>
          <form>
            <input type="text" placeholder="Blog Title" />
            <textarea
              name="content"
              id="content"
              cols={30}
              rows={10}
              placeholder="Content"
              required
            />
            <button>Regist</button>
          </form>
        </section>
      </main>
    </>
  );
};

export default Create;
