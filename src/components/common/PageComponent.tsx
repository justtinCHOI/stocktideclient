import PropTypes from 'prop-types';

function PageComponent({ serverData, movePage }) {
    return (
        <div className="m-6 flex justify-center">
            {serverData.prev ? (
                <div
                    className="m-2 p-2 w-16 text-center font-bold text-blue-400"
                    onClick={() => movePage({ page: serverData.prevPage, size: 10 })}
                >
                    Prev
                </div>
            ) : null}
            {serverData.pageNumList.map(pageNum => (
                <div
                    key={pageNum}
                    className={`m-2 p-2 w-12 text-center rounded shadow-md text-white ${
                        serverData.current === pageNum ? 'bg-gray-500' : 'bg-blue-400'
                    }`}
                    onClick={() => movePage({ page: pageNum, size: 10 })}
                >
                    {pageNum}
                </div>
            ))}
            {serverData.next ? (
                <div
                    className="m-2 p-2 w-16 text-center font-bold text-blue-400"
                    onClick={() => movePage({ page: serverData.nextPage, size: 10 })}
                >
                    Next
                </div>
            ) : null}
        </div>
    );
}

PageComponent.propTypes = {
    serverData: PropTypes.shape({
        prev: PropTypes.bool.isRequired,
        next: PropTypes.bool.isRequired,
        prevPage: PropTypes.number.isRequired,
        nextPage: PropTypes.number.isRequired,
        current: PropTypes.number.isRequired,
        pageNumList: PropTypes.arrayOf(PropTypes.number).isRequired,
    }).isRequired,
    movePage: PropTypes.func.isRequired
};

export default PageComponent;
