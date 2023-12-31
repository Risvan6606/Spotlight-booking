import React, { useEffect, useState } from 'react'
import UserHeader from '../../componants/user/userHeader'
import { userRequest } from '../../axios'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { setSingleArtist } from '../../Redux/singleArtistSlice'
import { Link, useNavigate } from 'react-router-dom'
import { setArtistMore } from '../../Redux/aritsMoreSlice'
import Footer from '../../componants/user/footer'
import ReactPaginate from 'react-paginate'
import { hideLoading, showLoading } from '../../Redux/alertSlice'
// import 'react-paginate/dist/react-paginate.css';

function Artist() {
    const artistMore = useSelector((state) => state.artistMore.artistMore)
    const [search, setSearch] = useState("")
    const [values, setValue] = useState([])
    const Navigate = useNavigate()
    const dispatch = useDispatch()
    const [category, setCategory] = useState()
    const [sortingOrder, setSortingOrder] = useState('desc');
    const [currentPage, setCurrentPage] = useState(0);
    const getData = async () => {
        dispatch(showLoading())
        userRequest({
            url: '/api/user/get-artist-data',
            method: 'post',
        }).then((response) => {
            dispatch(hideLoading())
            toast(response.data.message)
            dispatch(setArtistMore(response.data.data))
            setCategory(response.data.category)
            setValue(response.data.data)
        }).catch((err) => {
            dispatch(hideLoading())
            toast.error('not get')
            localStorage.removeItem('token')
            Navigate('/login')
        })
    }
    useEffect(() => {
        getData()
    }, [])
    // edit 1


    // edit

    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }
    const artistView = async (id) => {
        try {
            userRequest({
                url: '/api/user/artist-view',
                method: 'post',
                data: { artistId: id }
            }).then((response) => {
                console.log(response.data.success)
                if (response.data.success) {
                    Navigate('/artist-single-show', { state: response.data.data })
                } else {
                    toast.error('somthing went wrong')
                }
            }).catch((error) => {
                localStorage.removeItem('token')
                Navigate('/login')
                toast.error('please login')
            })
        } catch (error) {
            toast('somthing went wrong ')
        }
    }
    const bookingArtistView = async (id) => {
        try {
            userRequest({
                url: '/api/user/artist-view',
                method: 'post',
                data: { artistId: id }
            }).then((response) => {
                if (response.data.success) {
                    dispatch(setSingleArtist(response.data.data))
                    Navigate('/book-artist')
                } else {
                    console.log('risvn')
                }
            }).catch((error) => {
                console.log(error)
                toast.error('somthing went wrong')
            })
        } catch (error) {
            toast('somthing went wrong ')
        }
    }
    const filter = (value) => {
        const val = values.filter((element) => {
            return element.category_id === value
        })
        dispatch(setArtistMore(val))
    }

    // edit
    const itemsPerPage = 3;
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const handelPageClick = async (data) => {
        setCurrentPage(data.selected)
    }
    // edit
    const handleSortingChange = (event) => {
        const selectedValue = event.target.value;
        setSortingOrder(selectedValue === 'High' ? 'desc' : 'asc');
    };

    return (
        <>
            <UserHeader />
            {/* Edit */}
            <div class="searchFilter ">
                <form class="md:flex ">
                    {/*  */}
                    <div class="dropdown">
                        <button class="dropbtn">Category</button>
                        <div class="dropdown-content">
                            {category?.map((element) => {
                                return < a onClick={() => filter(element?._id)} >{element?.name}</a>
                            })
                            }
                        </div>
                    </div>
                    {/*  */}
                    <div class="relative w-full mt-3 md:mt-0">
                        <input
                            type="search"
                            id="search-dropdown"
                            onChange={(e) => setSearch(e.target.value)}
                            class="search_input p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                            placeholder="Search......."
                            required />
                        <button type="submit" class="absolute top-0 right-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                            <span class="sr-only">Search</span>
                        </button>
                    </div>
                    <div class="dropdown">
                        {/* <button class="sortbtn">Sort</button> */}
                        {/* <div class="dropdown-content">
                            <option value="Low"> Low To High</option>
                            <a>Low to high</a>
                            <a>Hight to Low</a>
                        </div> */}
                        <select
                            name="price"
                            id="price"
                            className='sortbtn'
                            onChange={handleSortingChange}
                        >
                            <option value="Low"> Low To High</option>
                            <option value="High">High To Low</option>
                        </select>
                    </div>
                </form >
            </div >

            {/* Edit */}
            < div className='d-flex showArtist_div ' >
                {artistMore.filter((user) => {
                    return search && search.toLowerCase() === '' ? user : user.firstName.toLowerCase().includes(search.toLowerCase())
                }).sort((a, b) => {
                    if (sortingOrder === 'asc') {
                        return a.midBudjet.localeCompare(b.midBudjet);
                    } else {
                        return b.midBudjet.localeCompare(a.midBudjet);
                    }
                }).slice(startIndex, endIndex)
                    .map((element) => {
                        return < div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 artist-cart-div" >
                            <a href="#">
                                <img class="p-8 rounded-t-lg" onClick={() => artistView(element?._id)} src={element?.image} alt=" product image" />
                            </a>
                            <div class="px-5 pb-5">
                                <a href="#">
                                    <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{element.firstName + ' ' + element.lastName}</h5>
                                </a>
                                <p class="text-gray-500 dark:text-gray-400">{truncate(element?.discription, 80)}</p>
                                <div class="flex element-center mt-2.5 mb-5">
                                    <svg class="w-4 h-4 text-yellow-300 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                    </svg>
                                    <svg class="w-4 h-4 text-yellow-300 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                    </svg>
                                    <svg class="w-4 h-4 text-yellow-300 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                    </svg>
                                    <svg class="w-4 h-4 text-yellow-300 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                    </svg>
                                    <svg class="w-4 h-4 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                    </svg>
                                    <span class="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">5.0</span>
                                </div>
                                <div class="flex element-center justify-between">
                                    <span class="text-3xl font-bold text-gray-900 dark:text-white">RS: {element?.midBudjet}</span>
                                    <Link
                                        onClick={() => bookingArtistView(element?._id)}
                                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Book</Link>
                                </div>
                            </div>
                        </div>
                    })
                }
            </div >
            <ReactPaginate
                previousLabel={'Previous'}
                nextLabel={'Next'}
                breakLabel={'...'}
                pageCount={Math.ceil(artistMore.length / itemsPerPage)}
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
                onPageChange={handelPageClick}
                containerClassName={'flex justify-center space-x-2 mt-11'}
                pageClassName={'inline-flex element-center text-sm'}
                pageLinkClassName={'flex element-center justify-center w-8 h-8 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'}
                activeClassName={'bg-blue-500 text-white'}
                disabledClassName={'opacity-50 pointer-events-none'}
                previousClassName={'inline-flex element-center justify-center px-3 h-8 ml-0 leading-tight text-white bg-blue-600 border border-blue-600 rounded-l-lg hover:bg-white hover:text-blue-700 dark:bg-blue-500 dark:border-blue-500 dark:text-blue-600 dark:hover:bg-blue-700 dark:hover:text-white'}
                nextClassName={'inline-flex element-center justify-center px-3 h-8 leading-tight text-white bg-blue-600 border border-blue-600 rounded-r-lg hover:bg-white hover:text-blue-700 dark:bg-blue-800 dark:border-blue-700 dark:text-blue-400 dark:hover:bg-white dark:hover:text-white'}
            />


            < Footer />
        </>
    )
}

export default Artist