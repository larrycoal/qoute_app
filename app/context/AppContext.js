"use client";
import React, { createContext, useState } from "react";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [showSideBar, setShowSideBar] = useState(false);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [modalMode, setModalMode] = useState(["Create", null]);
  const [allQuotes, setAllQuotes] = useState([]);

  const SideBarToggle = () => {
    setShowSideBar(!showSideBar);
  };
  const handleShowModal = (type, quote = null) => {
    setShowQuoteModal(!showQuoteModal);
    setModalMode([type, quote]);
  };

  const getUser = async (userId) => {
    const userRef = doc(db, "user", userId);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
      return null;
    }
  };
  const fetchAllQoutes = async () => {
    const querySnapshot = await getDocs(collection(db, "quotes"));
    let tempQuotes = [];
    querySnapshot.forEach(async (doc) => {
      // doc.data() is never undefined for query doc snapshots
      const tempDoc = doc.data();
      const author = await getUser(tempDoc.authorId);
      tempQuotes.push({
        quoteId: doc.id,
        ...tempDoc,
        likes: tempDoc.likes.length,
        ...author,
      });
      tempQuotes = tempQuotes.sort((a, b) => {
        return new Date(b.createdOn) - new Date(a.createdOn);
      });
      setAllQuotes(tempQuotes);
    });
  };

  const createQuote = async (newQuote) => {
    const quoteRef = doc(db, "quotes", v4());
    setDoc(quoteRef, newQuote, { merge: true })
      .then(() => {
        console.log("document set");
      })
      .catch((err) => console.log("error setting data"));
  };
  const updateQuote = async (quoteId, editedQuote) => {
    const quoteRef = doc(db, "quotes", quoteId);
    updateDoc(quoteRef, {
      quote: editedQuote,
    })
      .then(() => {
        console.log("Quote edited");
      })
      .catch(() => {
        console.log("Failed to edit quote");
      });
  };
  const deleteQuote = async (quoteId) => {
    const quoteRef = doc(db, "quotes", quoteId);
    await deleteDoc(quoteRef);
  };
  const uploadImage = async (file) => {
    let profileurl = null;
    const picRef = ref(storage, `profilepic/${file.name + v4()}`);
    await uploadBytes(picRef, file);
    profileurl = await getDownloadURL(picRef);
    return profileurl;
  };
  const updateUserProfile = async (userId, userDetail) => {
    const userRef = doc(db, "user", userId);
    updateDoc(userRef, userDetail)
      .then(() => {
        console.log("User updated");
      })
      .catch(() => {
        console.log("Failed to update user");
      });
  };
  const likeQuote = async (quoteId, user) => {
    const quoteRef = doc(db, "quotes", quoteId);
    const fetchedQuote = await getDoc(quoteRef);
    let allLikes = fetchedQuote.data().likes;
    if (allLikes.indexOf(user) === -1) {
      allLikes.push(user);
    } else {
      allLikes.splice(allLikes.indexOf(user), 1);
    }
    updateDoc(quoteRef, { likes: allLikes }, { merge: true });
  };
  return (
    <AppContext.Provider
      value={{
        showSideBar,
        SideBarToggle,
        showQuoteModal,
        handleShowModal,
        fetchAllQoutes,
        createQuote,
        allQuotes,
        getUser,
        modalMode,
        updateQuote,
        deleteQuote,
        uploadImage,
        updateUserProfile,
        likeQuote,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
